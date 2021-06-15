# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Template > Auto ident computed simple complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(`before  ${(b[$("c")] = $(b)[$("d")])}  after`);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$(`before  ` + (b[$(`c`)] = $(b)[$(`d`)]) + `  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpBinBothRhs = varInitAssignLhsComputedRhs;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpBinLhs = `before  ` + varInitAssignLhsComputedRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 'before 20 after'
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
