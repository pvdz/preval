# Preval test case

# init_assign_both_member_test.md

> Normalize > Binding > Init assign both member test
>
> Should normalize assignment init to separate line

Confirm the getter/setter is called the same number of times after normalization.

## Input

`````js filename=intro
var b = {get x(){ $(1); return 10; }, set x(n) { $(2, n); }};
var c = {get x(){ $(3); return 20; }, set x(n) { $(4, n); }};
var a = b.x = c.x;
$(5, a);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
b = {
  get x() {
    debugger;
    $(1);
    return 10;
  },
  set x($$0) {
    let n = $$0;
    debugger;
    $(2, n);
  },
};
c = {
  get x() {
    debugger;
    $(3);
    return 20;
  },
  set x($$0) {
    let n$1 = $$0;
    debugger;
    $(4, n$1);
  },
};
a = b.x = c.x;
$(5, a);
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
b = {
  get x() {
    debugger;
    $(1);
    return 10;
  },
  set x($$0) {
    let n = $$0;
    debugger;
    $(2, n);
    return undefined;
  },
};
c = {
  get x() {
    debugger;
    $(3);
    return 20;
  },
  set x($$0) {
    let n$1 = $$0;
    debugger;
    $(4, n$1);
    return undefined;
  },
};
const tmpNestedAssignPropRhs = c.x;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(5, a);
`````

## Output


`````js filename=intro
const c /*:object*/ = {
  get x() {
    debugger;
    $(3);
    return 20;
  },
  set x($$0) {
    const n$1 = $$0;
    debugger;
    $(4, n$1);
    return undefined;
  },
};
const tmpNestedAssignPropRhs = c.x;
const b /*:object*/ = {
  get x() {
    debugger;
    $(1);
    return 10;
  },
  set x($$0) {
    const n = $$0;
    debugger;
    $(2, n);
    return undefined;
  },
};
b.x = tmpNestedAssignPropRhs;
$(5, tmpNestedAssignPropRhs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  get x() {
    debugger;
    $( 3 );
    return 20;
  },
  set x( $$0 ) {
    const b = $$0;
    debugger;
    $( 4, b );
    return undefined;
  },
};
const c = a.x;
const d = {
  get x() {
    debugger;
    $( 1 );
    return 10;
  },
  set x( $$0 ) {
    const e = $$0;
    debugger;
    $( 2, e );
    return undefined;
  },
};
d.x = c;
$( 5, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 2, 20
 - 3: 5, 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
