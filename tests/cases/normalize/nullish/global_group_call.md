# Preval test case

# global_group_call.md

> Normalize > Nullish > Global group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
const y = (1, 2, $())??foo
$(y);
`````

## Pre Normal


`````js filename=intro
const y = (1, 2, $()) ?? foo;
$(y);
`````

## Normalized


`````js filename=intro
let y = $();
const tmpIfTest = y == null;
if (tmpIfTest) {
  y = foo;
} else {
}
$(y);
`````

## Output


`````js filename=intro
const y /*:unknown*/ = $();
const tmpIfTest /*:boolean*/ = y == null;
if (tmpIfTest) {
  const tmpClusterSSA_y /*:unknown*/ = foo;
  $(tmpClusterSSA_y);
} else {
  $(y);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = a == null;
if (b) {
  const c = foo;
  $( c );
}
else {
  $( a );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
