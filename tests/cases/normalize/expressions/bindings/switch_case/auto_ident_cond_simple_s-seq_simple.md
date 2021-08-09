# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident cond simple s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = 1 ? (40, 50, 60) : $($(100));
    $(a);
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = 1 ? (40, 50, 60) : $($(100));
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
  a = 60;
  $(a);
} else {
}
`````

## Output

`````js filename=intro
$(60);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
