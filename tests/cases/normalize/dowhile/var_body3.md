# Preval test case

# var_body3.md

> Normalize > Dowhile > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
do var x; while ($(x));
`````

## Pre Normal

`````js filename=intro
let x = undefined;
while (true) {
  if ($(x)) {
  } else {
    break;
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpIfTest = $(x);
while (true) {
  if (tmpIfTest) {
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
  tmpIfTest = $(undefined);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      tmpIfTest = $(undefined);
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
  a = $( undefined );
  while ($LOOP_UNROLL_10) {
    if (a) {
      a = $( undefined );
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
