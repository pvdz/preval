# Preval test case

# var_body.md

> Normalize > For > Regular > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(;$(false);) var x = 0;
`````

## Pre Normal

`````js filename=intro
let x = undefined;
{
  while ($(false)) {
    x = 0;
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpIfTest = $(false);
while (true) {
  if (tmpIfTest) {
    x = 0;
    tmpIfTest = $(false);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  let tmpClusterSSA_tmpIfTest = $(false);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      tmpClusterSSA_tmpIfTest = $(false);
    } else {
      break;
    }
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
