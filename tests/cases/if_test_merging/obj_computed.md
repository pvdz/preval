# Preval test case

# obj_computed.md

> If test merging > Obj computed
>
> When if test is an unknown boolean and the first statement is equal 
> except for boolean values then it can replace them with the test var.

## Input

`````js filename=intro
const bool = Boolean($(true));
const a = $();
let x;
if (bool) {
  x = {[a]: 1, b: true};
} else {
  x = {[a]: 1, b: false};
}
$(x);
`````

## Pre Normal


`````js filename=intro
const bool = Boolean($(true));
const a = $();
let x;
if (bool) {
  x = { [a]: 1, b: true };
} else {
  x = { [a]: 1, b: false };
}
$(x);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $(true);
const bool = Boolean(tmpCalleeParam);
const a = $();
let x = undefined;
if (bool) {
  x = { [a]: 1, b: true };
} else {
  x = { [a]: 1, b: false };
}
$(x);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(true);
const a /*:unknown*/ = $();
const tmpBool /*:boolean*/ = Boolean(tmpCalleeParam);
const tmpClusterSSA_x /*:object*/ = { [a]: 1, b: tmpBool };
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = $();
const c = Boolean( a );
const d = {
  [ b ]: 1,
  b: c,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 
 - 3: { undefined: '1', b: 'true' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
