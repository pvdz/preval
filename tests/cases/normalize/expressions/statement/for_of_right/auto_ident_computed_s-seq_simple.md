# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_computed_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let x of (1, 2, b)[$("c")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  const tmpForOfDeclRhs = tmpCompObj[tmpCompProp];
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  const tmpForOfDeclRhs = tmpCompObj[tmpCompProp];
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
