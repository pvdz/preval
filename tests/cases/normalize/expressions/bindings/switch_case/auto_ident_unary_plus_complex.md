# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident unary plus complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = +$(100);
    $(a);
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = +$(100);
    $(a);
  } else {
  }
}
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  const tmpUnaryArg = $(100);
  a = +tmpUnaryArg;
  $(a);
} else {
}
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const tmpClusterSSA_a = +tmpUnaryArg;
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
