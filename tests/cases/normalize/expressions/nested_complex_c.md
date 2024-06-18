# Preval test case

# nested_complex_c.md

> Normalize > Expressions > Nested complex c
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = 10, b = 20, c = [];
$(a = b = $(c).length);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = 10), (b = 20), (c = []);
$((a = b = $(c).length));
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
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
const c = [];
const tmpCompObj = $(c);
const tmpNestedComplexRhs = tmpCompObj.length;
$(tmpNestedComplexRhs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = b.length;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
