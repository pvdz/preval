# Preval test case

# auto_ident_computed_c-seq_simple.md

> normalize > expressions > statement > label > auto_ident_computed_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
label: (1, 2, $(b))[$("c")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpCompObj = $(b);
  const tmpCompProp = $('c');
  tmpCompObj[tmpCompProp];
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpCompObj = $(b);
  const tmpCompProp = $('c');
  tmpCompObj[tmpCompProp];
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
