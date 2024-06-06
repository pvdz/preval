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
const tmpIfTest = $(undefined);
if (tmpIfTest) {
  let tmpClusterSSA_tmpIfTest = $(undefined);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      tmpClusterSSA_tmpIfTest = $(undefined);
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
const a = $( undefined );
if (a) {
  let b = $( undefined );
  while ($LOOP_UNROLL_10) {
    if (b) {
      b = $( undefined );
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
