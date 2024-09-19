# Preval test case

# nested_simple_member_right.md

> Normalize > Expressions > Nested simple member right
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = 10, b = 20, c = {};
$(a = b = $(c).x);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = 10), (b = 20), (c = {});
$((a = b = $(c).x));
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
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
const c /*:object*/ = {};
const tmpCompObj = $(c);
const tmpNestedComplexRhs = tmpCompObj.x;
$(tmpNestedComplexRhs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = $( a );
const c = b.x;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
