# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Bindings > Switch case > Auto ident prop s-seq assign complex member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 10, d: 20 };

    let a = ((1, 2, b).c = $(b)[$("d")]);
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
    b = { c: 10, d: 20 };
    a = (1, 2, b).c = $(b)[$(`d`)];
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
  b = { c: 10, d: 20 };
  const tmpNestedAssignObj = b;
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b);
} else {
}
`````

## Output


`````js filename=intro
const tmpClusterSSA_b = { c: 10, d: 20 };
const tmpCompObj = $(tmpClusterSSA_b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpClusterSSA_b.c = tmpNestedAssignPropRhs;
$(tmpNestedAssignPropRhs, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
