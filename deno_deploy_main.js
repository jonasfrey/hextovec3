
import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

var s_html = `<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>hextovec3</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css">
        <style>
            *{
                margin: 0;
                padding: 0;
            }
            #main{
                padding: 1rem;
            }
        </style>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div id="main"></div>
        <script type='module'>import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.6/mod.js";

let n_count = 5;

var s_hex = '#000000';
var s_vec3 = "vec3(0.,0.,0.)";
var a_n_nor = [0.0, 0.0, 0.0];
let f_a_n_nor_from_s_hex = function(s_hex){

    var s = s_hex.trim();
    var a_s = s.split('#');
    var s_hexa = a_s.pop();
    var a_n_nor = []
    var s_hex_u8 = ''; 
    // debugger
    for(var n = 0; n < s_hexa.length; n+=1){
        if(((n+1)%2)== 0){
            let n_u8 = parseInt(\`0x\${s_hex_u8}\`);
            a_n_nor.push(n_u8/255);
            s_hex_u8 = '';
        }
        s_hex_u8+=s_hexa[n];
    }
    
    return a_n_nor;
}
let f_a_n_nor_from_s_vec3 = function(s_vec3){

    var s = s_vec3.trim();
    var a_s = s.split('(');
    s = a_s.pop();
    a_s = s.split(')');
    s = a_s.shift();
    a_s = s.split(",");
    a_n_nor = [
        parseFloat(a_s[0]),
        parseFloat(a_s[1]),
        parseFloat(a_s[2]),
    ]
    // a_s_u8_hex = [
    //     (a_n_nor[0]).toString(16),
    //     (a_n_nor[1]).toString(16),
    //     (a_n_nor[2]).toString(16),
    // ]
    return a_n_nor
}


window.f_s_hex_from_a_n_nor = function(a_n_nor){
    var s1 = (parseInt(a_n_nor[0]*255)).toString(16).padStart(2, '0');
    var s2 = (parseInt(a_n_nor[1]*255)).toString(16).padStart(2, '0');
    var s3 = (parseInt(a_n_nor[2]*255)).toString(16).padStart(2, '0');
    return \`#\${s1}\${s2}\${s3}\`
}
let f_s_vec3_from_a_n_nor = function(a_n_nor){
    return \`vec3(\${f_s_from_n_force_decimal_point(a_n_nor[0])}, \${f_s_from_n_force_decimal_point(a_n_nor[1])}, \${f_s_from_n_force_decimal_point(a_n_nor[2])})\`
}
var o_input_color = {
    f_o_js:function(){
        return {
            s_tag : "input", 
            type: "color",
            value: f_s_hex_from_a_n_nor(a_n_nor),
            oninput: function(){
                s_hex = this.value;
                a_n_nor = f_a_n_nor_from_s_hex(s_hex);
                console.log(a_n_nor)
                o_input_text_hex._f_render();
                o_input_text_vec3._f_render();
            }
        }
    }
}
var o_input_text_hex = {
    f_o_js:function(){
        return {
            s_tag : "input", 
            type: "text",
            placeholder: "#00ff00",
            value: f_s_hex_from_a_n_nor(a_n_nor),
            onkeyup: function(){
                s_hex = this.value;
                a_n_nor = f_a_n_nor_from_s_hex(s_hex);
                
                o_input_color._f_render();
                o_input_text_hex._f_render();

            }
        }
    }
}
var o_input_text_vec3 = {
    f_o_js:function(){
        return {
            s_tag : "input", 
            type: "text",
            placeholder: "vec3(0.,0.,0.)",
            value: f_s_vec3_from_a_n_nor(a_n_nor),
            onkeyup: function(){
                s_vec3 = this.value;
                a_n_nor = f_a_n_nor_from_s_vec3(s_vec3);
                o_input_text_hex._f_render();
                o_input_color._f_render();
            }
        }
    }
}
var o = {
    f_o_js(){
        return {
            // id: "main",
            s_tag: "article",
            a_o: [
                {
                    id: "test_div",
                    s_tag : "h1", 
                    innerText: "hextovec3"
                },

                o_input_color, 
                o_input_text_hex,
                o_input_text_vec3
            ]
        }
    },
}

let f_s_from_n_force_decimal_point = function(
    n, 
    n_dec_places = 3
){
    n = n.toFixed(n_dec_places);
    var s = n.toString();
    if(!s.includes('.')){
        return \`\${s}.0\`
    }
    return s;
}
var o_html = f_o_html_from_o_js(o);

var o_div_main = document.querySelector("#main");
o_div_main.appendChild(o_html)</script>
    </body>
</html>`

serve(
    function(req){
        return new Response(
            s_html, 
            {
                status: 200,
                headers: {
                    "content-type": "text/html",
                },
            }
        )
    }
)
