# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_cond_simple_c-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = 1 ? (40, 50, $(60)) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
{
  a = $(60);
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
