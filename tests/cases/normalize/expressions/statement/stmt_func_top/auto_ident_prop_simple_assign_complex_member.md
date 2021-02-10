# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> normalize > expressions > statement > stmt_func_top > auto_ident_prop_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };

  let a = { a: 999, b: 1000 };
  b.c = $(b)[$("d")];
  $(a, b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  const tmpAssignMemLhsObj = b;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
