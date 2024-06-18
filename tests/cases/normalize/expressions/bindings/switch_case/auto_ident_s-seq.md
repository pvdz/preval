# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto ident s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1;

    let a = ($(1), $(2), x);
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
    a = ($(1), $(2), x);
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
  $(1);
  $(2);
  a = x;
  $(a, x);
} else {
}
`````

## Output


`````js filename=intro
$(1);
$(2);
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
