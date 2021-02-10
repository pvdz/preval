# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_cond_simple_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(1 ? (40, 50, 60) : $($(100)))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
{
  tmpCompObj = 60;
}
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
