# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = 20, c = 30;
$(a = b = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
a = 10;
b = 20;
c = 30;
const tmpCallCallee = $;
b = c;
a = c;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var a;
var b;
a = 10;
b = 20;
b = 30;
a = 30;
let tmpCalleeParam = a;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
