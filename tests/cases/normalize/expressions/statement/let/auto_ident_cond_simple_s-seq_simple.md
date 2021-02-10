# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> normalize > expressions > statement > let > auto_ident_cond_simple_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 1 ? (40, 50, 60) : $($(100));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
{
  xyz = 60;
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
xyz = 60;
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: 60
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
