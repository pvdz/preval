# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > statement > for_in_right > auto_ident_computed_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let x in (1, 2, b)[$("c")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  const tmpForInDeclRhs = tmpCompObj[tmpCompProp];
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpCompProp = $('c');
  const tmpForInDeclRhs = b[tmpCompProp];
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
