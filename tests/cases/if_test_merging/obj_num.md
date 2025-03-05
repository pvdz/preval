# Preval test case

# obj_num.md

> If test merging > Obj num
>
> When if test is an unknown boolean and the first statement is equal 
> except for boolean values then it can replace them with the test var.

## Input

`````js filename=intro
const bool = Boolean($(true));
let x;
if (bool) {
  x = {200: 1, b: true};
} else {
  x = {200: 1, b: false};
}
$(x);
`````

## Pre Normal


`````js filename=intro
const bool = Boolean($(true));
let x;
if (bool) {
  x = { [200]: 1, b: true };
} else {
  x = { [200]: 1, b: false };
}
$(x);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $(true);
const bool = Boolean(tmpCalleeParam);
let x = undefined;
if (bool) {
  x = { [200]: 1, b: true };
} else {
  x = { [200]: 1, b: false };
}
$(x);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = Boolean(tmpCalleeParam);
const tmpClusterSSA_x /*:object*/ = { [200]: 1, b: tmpBool };
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = Boolean( a );
const c = {
  [ 200 ]: 1,
  b: b,
};
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: { 200: '1', b: 'true' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
