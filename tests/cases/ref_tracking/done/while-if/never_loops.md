# Preval test case

# never_loops.md

> Ref tracking > Done > While-if > Never loops
>
> A loop that never loops should not be a loop
> We can fix this when our loops are while(true) and they guarantee to break at the end of every branching path

## Options

- refTest

## Input

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app"; // never observed, overwritten inside the loop
  let b = "jhayon.vercel.app"; // never observed, overwritten in both branches in the loop
  let c = 1;
  const d = $( "x" );
  while ($LOOP_UNROLL_500) {
    a = d.slice(0);
    const e = a[ 0 ];
    const f = e === ".";
    if (f) {
      b = a.slice( 1 );
    }
    else {
      b = a;
    }
    const h = b.length;
    $(h)
    c = c + 1;
    break;
  }
}
`````


## Output

(Annotated with pids)

`````filename=intro
if ($) {
  /*4~94*/ let /*___14__*/ a = `jhayon.vercel.app`;
  let /*___18__*/ b = `jhayon.vercel.app`;
  let /*___22__*/ c = 1;
  const /*___25__*/ d = $(`x`);
  const /*___31__*/ tmpMCF = /*___33__*/ d./*___34__*/ slice;
  /*___44__*/ a = /*___38__*/ $dotCall(/*___39__*/ tmpMCF, /*___40__*/ d, `slice`, 0);
  const /*___46__*/ e = /*___48__*/ a[0];
  const /*___51__*/ f = /*___53__*/ e === `.`;
  if (/*___57__*/ f) {
    /*58~74*/ const /*___61__*/ tmpMCF$1 = /*___63__*/ a./*___64__*/ slice;
    /*___74__*/ b = /*___68__*/ $dotCall(/*___69__*/ tmpMCF$1, /*___70__*/ a, `slice`, 1);
  } /*75~79*/ else {
    /*___79__*/ b = /*___78__*/ a;
  }
  const /*___81__*/ h = /*___83__*/ b./*___84__*/ length;
  $(/*___88__*/ h);
  /*___94__*/ c = /*___92__*/ c + 1;
} /*95~95*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @14      | ########## | not read    | none           | 44
  - w @44      | ########## | 48,63,70,78 | 14             | none
  - r @48      | 44
  - r @63      | 44
  - r @70      | 44
  - r @78      | 44

b:
  - w @18      | ########## | not read    | none           | 74,79
  - w @74      | ########## | 83          | 18             | none
  - w @79      | ########## | 83          | 18             | none
  - r @83      | 74,79

c:
  - w @22      | ########## | 92          | none           | 94
  - r @92      | 22
  - w @94      | ########## | not read    | 22             | none

d:
  - w @25      | ########## | 33,40       | none           | none
  - r @33      | 25
  - r @40      | 25

tmpMCF:
  - w @31      | ########## | 39          | none           | none
  - r @39      | 31

e:
  - w @46      | ########## | 53          | none           | none
  - r @53      | 46

f:
  - w @51      | ########## | 57          | none           | none
  - r @57      | 51

tmpMCF$1:
  - w @61      | ########## | 69          | none           | none
  - r @69      | 61

h:
  - w @81      | ########## | 88          | none           | none
  - r @88      | 81
