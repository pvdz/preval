# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > statement > tagged > auto_ident_array_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${[$(1), 2, $(3)]} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
const tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
const tmpCalleeParam$1 = [tmpArrElement, 2, tmpArrElement$2];
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 
  ['before ', ' after'],
  [1, 2, 3],

 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
