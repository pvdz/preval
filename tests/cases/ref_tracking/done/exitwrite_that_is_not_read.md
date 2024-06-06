# Preval test case

# exitwrite_that_is_not_read.md

> Tofix > Exitwrite that is not read
>
> An exitWrite that is not read should be eliminated.
> Pretty trivial case but.

## Input

`````js filename=intro
let x = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
x = 3;
$(3);
`````

## Pre Normal


`````js filename=intro
let x = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
x = 3;
$(3);
`````

## Normalized


`````js filename=intro
let x = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
x = 3;
$(3);
`````

## Output


`````js filename=intro
let x = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
$( 1 );
try {
  $( 1 );
  a = 2;
}
catch (b) {

}
$( a );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
