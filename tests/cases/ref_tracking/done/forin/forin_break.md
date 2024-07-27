# Preval test case

# forin_break.md

> Ref tracking > Done > Forin > Forin break
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Options

- refTest

## Input

`````js filename=intro
const obj = {a:10, b:20};
for (const x in obj) {
  $(x);
  break;
}
$('after');
`````

## Output

(Annotated with pids)

`````filename=intro
const obj___4__ = { a___7__: 10, b___10__: 20 };
let tmpForInGen___14__ = $forIn___16__(obj___17__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___19__) {
  /*20*/ let tmpForInNext___23__ = tmpForInGen___26__.next___27__();
  const tmpIfTest___30__ = tmpForInNext___32__.done___33__;
  if (tmpIfTest___35__) {
    /*36*/ break;
  } /*38*/ else {
    const x___41__ = tmpForInNext___43__.value___44__;
    $(x___48__);
    break;
  }
}
$(`after`);
`````

Ref tracking result:

                 | reads      | read by     | overWrites     | overwritten by
obj:
  - w @4       | ########## | 17          | none           | none
  - r @17      | 4

tmpForInGen:
  - w @14       | ########## | 26          | none           | none
  - r @26       | 14

tmpForInNext:
  - w @23        | ########## | 32,43       | none           | none
  - r @32        | 23
  - r @43        | 23

tmpIfTest:
  - w @30        | ########## | 35          | none           | none
  - r @35        | 30

x:
  - w @41        | ########## | 48          | none           | none
  - r @48        | 41
