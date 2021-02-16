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
const tmpCompObj = $(c);
const tmpNestedComplexRhs = tmpCompObj.x;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var a;
var b;
a = 10;
b = 20;
const c = {};
const tmpCompObj = $(c);
const tmpNestedComplexRhs = tmpCompObj.x;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
const tmpCalleeParam = a;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
