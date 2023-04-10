const {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
} = require("firebase/firestore");
const { db } = require("./database.js");

async function addDraft(draft) {
    return await addHelper(draft, "drafts");
}

async function addHelper(draft, coll) {
    const { title } = draft.post;
    if (title.trim()) {
        const { sutta_id } = draft.sutta,
            id = `${sutta_id}: ${title}`,
            slug = slugify(id);
        await setDoc(doc(db, coll, slug), draft);
        return slug;
    } else {
        alert("Must have a title!");
    }

    function slugify(str) {
        return (
            str
                .toLowerCase()
                .trim()
                // whitespace, emdash and period to hyphen:
                .replace(/[\s\u2014\.]+/g, "-")
                .replace(/[:;,'"“”]+/g, "")
        );
    }
}

async function addPost(draft) {
    return await addHelper(draft, "posts");
}

async function deleteDraft(id) {
    return await deleteHelper(id, "drafts");
}

async function deleteHelper(id, coll) {
    return await deleteDoc(doc(db, coll, id));
}

async function deletePost(id) {
    return await deleteHelper(id, "posts");
}

async function getAllDrafts() {
    return await getAllHelper("drafts");
}

async function getAllHelper(coll) {
    const querySnapshot = await getDocs(collection(db, coll)),
        result = [];
    querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
    result.sort((a, b) => {
        const getDate = (x) => new Date(x.post.date.seconds * 1000);
        // most recent first:
        return getDate(b) - getDate(a);
    });
    return result;
}

async function getAllPosts() {
    return await getAllHelper("posts");
}

async function getDraft(id) {
    return await getHelper(id, "drafts");
}

async function getHelper(id, coll) {
    const docRef = doc(db, coll, id),
        docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data();
}

async function getPost(id) {
    return await getHelper(id, "posts");
}

module.exports = {
    addDraft,
    addPost,
    deleteDraft,
    deletePost,
    getAllDrafts,
    getAllPosts,
    getDraft,
    getPost,
};
