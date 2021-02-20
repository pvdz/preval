# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident cond simple complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = 1 ? $(2) : $($(100));
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = undefined;
a = $(2);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = $(2);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
