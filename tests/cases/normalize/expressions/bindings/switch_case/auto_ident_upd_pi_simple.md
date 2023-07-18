# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident upd pi simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = ++b;
    $(a, b);
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = 1;
    a = ++b;
    $(a, b);
  } else {
  }
}
`````

## Normalized

`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  b = 1;
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  $(a, b);
} else {
}
`````

## Output

`````js filename=intro
$(2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
