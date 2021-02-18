# Preval test case

# nested_complex_c.md

> normalize > assignment > nested_complex_c
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = 20, c = [];
$(a = b = $(c).length);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
a = 10;
b = 20;
c = [];
const tmpCallCallee = $;
const tmpCompObj = $(c);
const tmpNestedComplexRhs = tmpCompObj.length;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var a;
const c = [];
const tmpCompObj = $(c);
const tmpNestedComplexRhs = tmpCompObj.length;
$(tmpNestedComplexRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
