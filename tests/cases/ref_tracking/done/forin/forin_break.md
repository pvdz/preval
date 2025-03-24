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
const obj___5__ = { a___8__: 10, b___11__: 20 };
const tmpForInGen___14__ = $forIn___16__(obj___17__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___19__) {
  /*20*/ const tmpForInNext___24__ = tmpForInGen___27__.next___28__();
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


## Todos triggered


None


## Ref tracking result


                 | reads      | read by     | overWrites     | overwritten by
obj:
  - w @5       | ########## | 17          | none           | none
  - r @17      | 5

tmpForInGen:
  - w @14       | ########## | 27          | none           | none
  - r @27       | 14

tmpForInNext:
  - w @24        | ########## | 32,43       | none           | none
  - r @32        | 24
  - r @43        | 24

tmpIfTest:
  - w @30        | ########## | 35          | none           | none
  - r @35        | 30

x:
  - w @41        | ########## | 48          | none           | none
  - r @48        | 41
