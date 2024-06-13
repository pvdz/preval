# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident delete computed s-seq complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete ($(1), $(2), arg)[$("y")];
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
    a = delete ($(1), $(2), arg)[$(`y`)];
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
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
} else {
}
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const tmpClusterSSA_arg = { y: 1 };
const tmpClusterSSA_a = delete tmpClusterSSA_arg[tmpDeleteCompProp];
$(tmpClusterSSA_a, tmpClusterSSA_arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
