# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident unary simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1;

    let a = typeof x;
    $(a, x);
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let x;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    x = 1;
    a = typeof x;
    $(a, x);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let x = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  x = 1;
  a = typeof x;
  $(a, x);
} else {
}
`````

## Output


`````js filename=intro
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
