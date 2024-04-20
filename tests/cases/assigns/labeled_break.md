# Preval test case

# labeled_break.md

> Assigns > Labeled break
>
> Breaking to labels may be funky for ref tracking

#TODO

## Input

`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      x = 20;
      break foo;
    }
    $(x); // can NOT observe the 20 (ignoring that it is dead code)
  }
  $(x); // CAN observe the 20
}
`````

## Pre Normal

`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      x = 20;
      break foo;
    }
    $(x);
  }
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = 10;
foo: {
  if ($) {
    x = 20;
    break foo;
  } else {
    $(x);
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = 10;
if ($) {
  x = 20;
} else {
  $(x);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 10;
if ($) {
  a = 20;
}
else {
  $( a );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
