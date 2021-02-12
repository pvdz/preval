# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = 20, c = {};
$(a = b = $(c).x);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
a = 10;
b = 20;
c = {};
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpCompObj = $(c);
const tmpNestedComplexRhs$1 = tmpCompObj.x;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
a = 10;
b = 20;
c = {};
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpCompObj = $(c);
const tmpNestedComplexRhs$1 = tmpCompObj.x;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
