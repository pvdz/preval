# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident unary typeof complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = 1;

    let a = typeof $(arg);
    $(a, arg);
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let arg;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    arg = 1;
    a = typeof $(arg);
    $(a, arg);
  } else {
  }
}
`````

## Normalized

`````js filename=intro
let arg = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  arg = 1;
  const tmpUnaryArg = $(arg);
  a = typeof tmpUnaryArg;
  $(a, arg);
} else {
}
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const tmpClusterSSA_a = typeof tmpUnaryArg;
$(tmpClusterSSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
