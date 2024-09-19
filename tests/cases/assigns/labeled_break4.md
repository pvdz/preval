# Preval test case

# labeled_break4.md

> Assigns > Labeled break4
>
> Breaking to labels may be funky for ref tracking

## Input

`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      break foo;
    } else {
      x = 20;
    }
    $(x); // can observe only the 20
  }
  $(x); // CAN observe the 10, 20
}
`````

## Pre Normal


`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      break foo;
    } else {
      x = 20;
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
    break foo;
  } else {
    x = 20;
    $(x);
  }
}
$(x);
`````

## Output


`````js filename=intro
let x /*:number*/ = 10;
if ($) {
} else {
  x = 20;
  $(20);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 10;
if ($) {

}
else {
  a = 20;
  $( 20 );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
