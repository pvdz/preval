# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto ident delete prop s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete ($(1), $(2), arg).y;
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
    arg = { y: 1 };
    a = delete ($(1), $(2), arg).y;
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
  arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteObj = arg;
  a = delete tmpDeleteObj.y;
  $(a, arg);
} else {
}
`````

## Output


`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const a = delete arg.y;
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = delete a.y;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
