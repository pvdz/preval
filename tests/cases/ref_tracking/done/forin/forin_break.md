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
const /*___5__*/ obj = { /*___8__*/ a: 10, /*___11__*/ b: 20 };
const /*___14__*/ tmpForInGen = /*___16__*/ $forIn(/*___17__*/ obj);
while (/*___19__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*20~47*/ const /*___24__*/ tmpForInNext = /*___26__*/ tmpForInGen();
  const /*___28__*/ tmpIfTest = /*___30__*/ tmpForInNext./*___31__*/ done;
  if (/*___33__*/ tmpIfTest) {
    /*34~35*/ break;
  } /*36~47*/ else {
    const /*___39__*/ x = /*___41__*/ tmpForInNext./*___42__*/ value;
    $(/*___46__*/ x);
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
  - w @14       | ########## | 26          | none           | none
  - r @26       | 14

tmpForInNext:
  - w @24        | ########## | 30,41       | none           | none
  - r @30        | 24
  - r @41        | 24

tmpIfTest:
  - w @28        | ########## | 33          | none           | none
  - r @33        | 28

x:
  - w @39        | ########## | 46          | none           | none
  - r @46        | 39
