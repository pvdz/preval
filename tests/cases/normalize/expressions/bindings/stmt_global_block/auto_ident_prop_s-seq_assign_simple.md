# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_prop_s-seq_assign_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = ((1, 2, b).c = 2);
  $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b = { c: 1 };
  const varInitAssignLhsComputedObj = b;
  const varInitAssignLhsComputedRhs = 2;
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b);
}
`````

## Output

`````js filename=intro
let b = { c: 1 };
b.c = 2;
$(2, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
