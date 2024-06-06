# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Bindings > Switch case > Auto ident literal
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = "foo";
    $(a);
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = `foo`;
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
  a = `foo`;
  $(a);
} else {
}
`````

## Output


`````js filename=intro
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
