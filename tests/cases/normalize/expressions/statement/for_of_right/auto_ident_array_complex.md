# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > statement > for_of_right > auto_ident_array_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of [$(1), 2, $(3)]);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$2 = $(3);
  const tmpForOfDeclRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpArrElement = $(1);
  const tmpArrElement$2 = $(3);
  const tmpForOfDeclRhs = [tmpArrElement, 2, tmpArrElement$2];
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
