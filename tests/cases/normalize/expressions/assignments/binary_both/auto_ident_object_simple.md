# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: 1, y: 2, z: 3 }) + (a = { x: 1, y: 2, z: 3 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: 1, y: 2, z: 3 }) + (a = { x: 1, y: 2, z: 3 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = { x: 1, y: 2, z: 3 };
let tmpBinBothLhs = a;
a = { x: 1, y: 2, z: 3 };
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { x: 1, y: 2, z: 3 };
const tmpClusterSSA_a = { x: 1, y: 2, z: 3 };
const tmpCalleeParam = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
x: 1,
y: 2,
z: 3
;
const b = {
x: 1,
y: 2,
z: 3
;
const c = a + b;
$( c );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '[object Object][object Object]'
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
