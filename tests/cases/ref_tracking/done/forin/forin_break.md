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
/* stmt(4): */ const /*___5__*/ obj = { /*___8__*/ a: 10, /*___11__*/ b: 20 };
/* stmt(13): */ const /*___14__*/ tmpForInGen = /*___16__*/ $forIn(/*___17__*/ obj);
/* stmt(18): */ while (/*___19__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*20~47*/ /* stmt(23): */ const /*___24__*/ tmpForInNext = /*___26__*/ tmpForInGen();
  /* stmt(27): */ const /*___28__*/ tmpIfTest = /*___30__*/ tmpForInNext./*___31__*/ done;
  /* stmt(32): */ if (/*___33__*/ tmpIfTest) {
    /*34~35*/ /* stmt(35): */ break;
  } /*36~47*/ else {
    /* stmt(38): */ const /*___39__*/ x = /*___41__*/ tmpForInNext./*___42__*/ value;
    /* stmt(43): */ $(/*___46__*/ x);
    /* stmt(47): */ break;
  }
}
/* stmt(48): */ $(`after`);
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
