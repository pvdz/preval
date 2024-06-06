# Preval test case

# no__assigned_first_in_branch.md

> Binding > Promote const > No  assigned first in branch
>
> Trying to create classic tdz problems

The var is first updated in a branch so we can't make it a constant.

#TODO

## Input

`````js filename=intro
var x = 100;
if ($(1)) {
  x = 10;
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = 100;
if ($(1)) {
  x = 10;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 100;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
} else {
}
$(x);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(10);
} else {
  $(100);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 10 );
}
else {
  $( 100 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
