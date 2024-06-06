# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto ident new prop c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new (1, 2, $(b)).$(1);
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
    a = new (1, 2, $(b)).$(1);
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
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
  $(a);
} else {
}
`````

## Output


`````js filename=intro
const tmpClusterSSA_b = { $: $ };
const tmpCompObj = $(tmpClusterSSA_b);
const tmpNewCallee = tmpCompObj.$;
const tmpClusterSSA_a = new tmpNewCallee(1);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = new c( 1 );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
