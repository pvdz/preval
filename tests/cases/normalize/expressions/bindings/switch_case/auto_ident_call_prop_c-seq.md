# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto ident call prop c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = (1, 2, $(b)).$(1);
    $(a);
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = { $: $ };
    a = (1, 2, $(b)).$(1);
    $(a);
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
  b = { $: $ };
  const tmpCallObj = $(b);
  a = tmpCallObj.$(1);
  $(a);
} else {
}
`````

## Output


`````js filename=intro
const tmpClusterSSA_b = { $: $ };
const tmpCallObj = $(tmpClusterSSA_b);
const tmpClusterSSA_a = tmpCallObj.$(1);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
