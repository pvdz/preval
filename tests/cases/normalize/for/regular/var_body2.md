# Preval test case

# var_body2.md

> Normalize > For > Regular > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(;$(x);) var x = 0;
`````

## Pre Normal

`````js filename=intro
let x = undefined;
{
  while ($(x)) {
    x = 0;
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpIfTest = $(x);
while (true) {
  if (tmpIfTest) {
    x = 0;
    tmpIfTest = $(x);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpIfTest = $(undefined);
if (tmpIfTest) {
  tmpIfTest = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      tmpIfTest = $(0);
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( undefined );
if (a) {
  a = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (a) {
      a = $( 0 );
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
