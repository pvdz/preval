# Preval test case

# auto_ident_cond_simple_simple_simple.md

> normalize > expressions > statement > let > auto_ident_cond_simple_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 1 ? 2 : $($(100));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
if (1) {
  xyz = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  xyz = tmpCallCallee(tmpCalleeParam);
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
xyz = 2;
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
