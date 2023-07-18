# Preval test case

# base_try_finally.md

> Try > Base try finally
>
> Try base cases

#TODO

## Input

`````js filename=intro
$(1);
try {
  $(2);
} finally {
  $(3);
}
$(3);
`````

## Pre Normal

`````js filename=intro
$(1);
try {
  $(2);
} finally {
  $(3);
}
$(3);
`````

## Normalized

`````js filename=intro
$(1);
try {
  $(2);
} finally {
  $(3);
}
$(3);
`````

## Output

`````js filename=intro
$(1);
try {
  $(2);
} finally {
  $(3);
}
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
try {
  $( 2 );
}
finally {
  $( 3 );
}
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
