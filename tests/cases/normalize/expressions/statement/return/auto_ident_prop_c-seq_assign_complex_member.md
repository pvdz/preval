# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> normalize > expressions > statement > return > auto_ident_prop_c-seq_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
function f() {
  return ((1, 2, $(b)).c = $(b)[$("d")]);
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpNestedAssignObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpReturnArg = tmpNestedPropAssignRhs;
  return tmpReturnArg;
}
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
