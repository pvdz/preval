# Preval test case

# nested_complex_a.md

> Normalize > Expressions > Nested complex a
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = [], b = 20, c = 30;
$($(a).length = b = c);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = []), (b = 20), (c = 30);
$(($(a).length = b = c));
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = [];
b = 20;
c = 30;
const varInitAssignLhsComputedObj = $(a);
b = c;
let varInitAssignLhsComputedRhs = b;
varInitAssignLhsComputedObj.length = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpClusterSSA_a /*:array*/ = [];
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpClusterSSA_a);
varInitAssignLhsComputedObj.length = 30;
$(30);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = $( a );
b.length = 30;
$( 30 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
